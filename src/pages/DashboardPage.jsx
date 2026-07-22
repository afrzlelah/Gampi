import { useAuth } from '../context/AuthContext';
import FarmerDashboard from './dashboards/FarmerDashboard';
import BuyerDashboard from './dashboards/BuyerDashboard';
import InvestorDashboard from './dashboards/InvestorDashboard';
import AdminDashboard from './dashboards/AdminDashboard';

export default function DashboardPage() {
  const { user } = useAuth();
  const role = user?.role || 'admin';

  switch (role) {
    case 'farmer':
      return <FarmerDashboard />;
    case 'buyer_enterprise':
    case 'buyer_umkm':
      return <BuyerDashboard />;
    case 'investor':
      return <InvestorDashboard />;
    default:
      return <AdminDashboard />; // Original Dashboard
  }
}
