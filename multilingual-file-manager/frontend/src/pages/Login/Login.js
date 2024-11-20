import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTranslation } from 'react-i18next';

export const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(credentials);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md p-8">
        <h1 className="text-2xl font-bold">{t('login')}</h1>
        <Input
          type="email"
          placeholder={t('email')}
          onChange={(e) => setCredentials(prev => ({
            ...prev,
            email: e.target.value
          }))}
        />
        <Input
          type="password"
          placeholder={t('password')}
          onChange={(e) => setCredentials(prev => ({
            ...prev,
            password: e.target.value
          }))}
        />
        <Button type="submit" className="w-full">
          {t('login')}
        </Button>
      </form>
    </div>
  );
}; 