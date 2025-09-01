import { ProfileView } from '@/components/auth/ProfileView';
import Navigation from '@/components/Navigation';

const Profile = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/50">
      <Navigation />
      <div className="pt-24 pb-12 px-4">
        <ProfileView />
      </div>
    </div>
  );
};

export default Profile;