import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LanguageSelector } from '@/components/LanguageSelector/LanguageSelector';
import { useToast } from '@/components/ui/use-toast';

export const Profile = () => {
  const { user, updateProfile } = useAuth();
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile(formData);
      setIsEditing(false);
      toast({
        title: t('success'),
        description: t('profile_updated')
      });
    } catch (error) {
      toast({
        title: t('error'),
        description: t('update_failed'),
        variant: 'destructive'
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">{t('profile')}</h1>
      <div className="space-y-4">
        <div className="mb-4">
          <h2 className="text-lg mb-2">{t('language_preference')}</h2>
          <LanguageSelector />
        </div>
        
        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              value={formData.username}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                username: e.target.value
              }))}
              label={t('username')}
            />
            <Input
              value={formData.email}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                email: e.target.value
              }))}
              label={t('email')}
            />
            <div className="space-x-2">
              <Button type="submit">{t('save')}</Button>
              <Button 
                variant="outline" 
                onClick={() => setIsEditing(false)}
              >
                {t('cancel')}
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="font-bold">{t('username')}:</label>
              <span className="ml-2">{user.username}</span>
            </div>
            <div>
              <label className="font-bold">{t('email')}:</label>
              <span className="ml-2">{user.email}</span>
            </div>
            <Button onClick={() => setIsEditing(true)}>
              {t('edit_profile')}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}; 