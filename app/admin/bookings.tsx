import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Plus, CreditCard as Edit, Trash2, Search, ArrowLeft, ExternalLink, Eye, EyeOff } from 'lucide-react-native';
import { router } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { BookingForm } from '@/types/database';

export default function AdminBookingsScreen() {
  const [bookingForms, setBookingForms] = useState<BookingForm[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingForm, setEditingForm] = useState<BookingForm | null>(null);
  const [formData, setFormData] = useState({
    coach_name: '',
    form_url: '',
    is_active: true,
  });

  useEffect(() => {
    fetchBookingForms();
  }, []);

  const fetchBookingForms = async () => {
    try {
      if (!supabase) {
        // Mock data when Supabase is not configured
        setBookingForms([
          {
            id: '1',
            coach_name: 'Rinesh Kumar',
            form_url: 'https://forms.google.com/rinesh-booking',
            is_active: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          {
            id: '2',
            coach_name: 'Harsha Patel',
            form_url: 'https://forms.google.com/harsha-booking',
            is_active: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          {
            id: '3',
            coach_name: 'Divyanshu Singh',
            form_url: 'https://forms.google.com/divyanshu-booking',
            is_active: false,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ]);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('booking_forms')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setBookingForms(data || []);
    } catch (error) {
      console.error('Error fetching booking forms:', error);
      Alert.alert('Error', 'Failed to fetch booking forms');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveForm = async () => {
    try {
      if (!supabase) {
        Alert.alert('Info', 'Database not configured. Changes are temporary.');
        setShowModal(false);
        setEditingForm(null);
        resetForm();
        return;
      }

      if (editingForm) {
        const { error } = await supabase
          .from('booking_forms')
          .update(formData)
          .eq('id', editingForm.id);
        
        if (error) throw error;
        Alert.alert('Success', 'Booking form updated successfully');
      } else {
        const { error } = await supabase
          .from('booking_forms')
          .insert([formData]);
        
        if (error) throw error;
        Alert.alert('Success', 'Booking form created successfully');
      }
      
      setShowModal(false);
      setEditingForm(null);
      resetForm();
      fetchBookingForms();
    } catch (error) {
      console.error('Error saving booking form:', error);
      Alert.alert('Error', 'Failed to save booking form');
    }
  };

  const handleDeleteForm = async (formId: string) => {
    Alert.alert(
      'Delete Booking Form',
      'Are you sure you want to delete this booking form?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              if (!supabase) {
                Alert.alert('Info', 'Database not configured. Changes are temporary.');
                return;
              }

              const { error } = await supabase
                .from('booking_forms')
                .delete()
                .eq('id', formId);
              
              if (error) throw error;
              Alert.alert('Success', 'Booking form deleted successfully');
              fetchBookingForms();
            } catch (error) {
              console.error('Error deleting booking form:', error);
              Alert.alert('Error', 'Failed to delete booking form');
            }
          },
        },
      ]
    );
  };

  const toggleFormStatus = async (form: BookingForm) => {
    try {
      if (!supabase) {
        Alert.alert('Info', 'Database not configured. Changes are temporary.');
        return;
      }

      const { error } = await supabase
        .from('booking_forms')
        .update({ is_active: !form.is_active })
        .eq('id', form.id);
      
      if (error) throw error;
      fetchBookingForms();
    } catch (error) {
      console.error('Error updating form status:', error);
      Alert.alert('Error', 'Failed to update form status');
    }
  };

  const openEditModal = (form: BookingForm) => {
    setEditingForm(form);
    setFormData({
      coach_name: form.coach_name,
      form_url: form.form_url,
      is_active: form.is_active,
    });
    setShowModal(true);
  };

  const openCreateModal = () => {
    setEditingForm(null);
    resetForm();
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      coach_name: '',
      form_url: '',
      is_active: true,
    });
  };

  const filteredForms = bookingForms.filter(form =>
    form.coach_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#10b981', '#059669']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Booking Management</Text>
        <Text style={styles.headerSubtitle}>{bookingForms.length} booking forms</Text>
      </LinearGradient>

      <View style={styles.content}>
        {/* Search and Add */}
        <View style={styles.actionBar}>
          <View style={styles.searchBox}>
            <Search size={20} color="#6b7280" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search coaches..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#9ca3af"
            />
          </View>
          <TouchableOpacity style={styles.addButton} onPress={openCreateModal}>
            <Plus size={20} color="#ffffff" />
          </TouchableOpacity>
        </View>

        {/* Forms List */}
        <ScrollView style={styles.formsList} showsVerticalScrollIndicator={false}>
          {filteredForms.map((form) => (
            <View key={form.id} style={styles.formCard}>
              <View style={styles.formHeader}>
                <View style={styles.formInfo}>
                  <View style={styles.formTitleRow}>
                    <Text style={styles.formTitle}>{form.coach_name}</Text>
                    <View style={[styles.statusBadge, form.is_active ? styles.activeBadge : styles.inactiveBadge]}>
                      <Text style={[styles.statusText, form.is_active ? styles.activeText : styles.inactiveText]}>
                        {form.is_active ? 'Active' : 'Inactive'}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.urlRow}>
                    <ExternalLink size={14} color="#8b5cf6" />
                    <Text style={styles.urlText} numberOfLines={1}>{form.form_url}</Text>
                  </View>
                  <Text style={styles.metaText}>
                    Created: {new Date(form.created_at).toLocaleDateString()}
                  </Text>
                </View>
                <View style={styles.formActions}>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => toggleFormStatus(form)}>
                    {form.is_active ? (
                      <EyeOff size={16} color="#f59e0b" />
                    ) : (
                      <Eye size={16} color="#10b981" />
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => openEditModal(form)}>
                    <Edit size={16} color="#8b5cf6" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleDeleteForm(form.id)}>
                    <Trash2 size={16} color="#ef4444" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Form Modal */}
      <Modal visible={showModal} animationType="slide" presentationStyle="pageSheet">
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              {editingForm ? 'Edit Booking Form' : 'Add Booking Form'}
            </Text>
            <TouchableOpacity onPress={() => setShowModal(false)}>
              <Text style={styles.cancelButton}>Cancel</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Coach Name</Text>
              <TextInput
                style={styles.input}
                value={formData.coach_name}
                onChangeText={(text) => setFormData({ ...formData, coach_name: text })}
                placeholder="Enter coach name"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Google Form URL</Text>
              <TextInput
                style={styles.input}
                value={formData.form_url}
                onChangeText={(text) => setFormData({ ...formData, form_url: text })}
                placeholder="https://forms.google.com/..."
                autoCapitalize="none"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Status</Text>
              <TouchableOpacity
                style={[styles.checkbox, formData.is_active && styles.checkboxActive]}
                onPress={() => setFormData({ ...formData, is_active: !formData.is_active })}>
                <Text style={[styles.checkboxText, formData.is_active && styles.checkboxTextActive]}>
                  {formData.is_active ? 'Active' : 'Inactive'}
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={handleSaveForm}>
              <Text style={styles.saveButtonText}>
                {editingForm ? 'Update Form' : 'Create Form'}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  backButton: {
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#ffffff',
    opacity: 0.9,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  actionBar: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1f2937',
  },
  addButton: {
    backgroundColor: '#10b981',
    borderRadius: 12,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formsList: {
    flex: 1,
  },
  formCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  formHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  formInfo: {
    flex: 1,
    marginRight: 16,
  },
  formTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  formTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginRight: 12,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  activeBadge: {
    backgroundColor: '#dcfce7',
  },
  inactiveBadge: {
    backgroundColor: '#fee2e2',
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  activeText: {
    color: '#16a34a',
  },
  inactiveText: {
    color: '#dc2626',
  },
  urlRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  urlText: {
    flex: 1,
    fontSize: 12,
    color: '#8b5cf6',
    fontWeight: '600',
  },
  metaText: {
    fontSize: 12,
    color: '#9ca3af',
  },
  formActions: {
    flexDirection: 'column',
    gap: 8,
  },
  actionButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  cancelButton: {
    fontSize: 16,
    color: '#8b5cf6',
    fontWeight: '600',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#1f2937',
    backgroundColor: '#f9fafb',
  },
  checkbox: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#f9fafb',
    alignItems: 'center',
  },
  checkboxActive: {
    backgroundColor: '#10b981',
    borderColor: '#10b981',
  },
  checkboxText: {
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '600',
  },
  checkboxTextActive: {
    color: '#ffffff',
  },
  saveButton: {
    backgroundColor: '#10b981',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});