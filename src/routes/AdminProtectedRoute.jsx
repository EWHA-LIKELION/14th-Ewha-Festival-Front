import { Navigate, useParams } from 'react-router-dom';
import { useMyProfile } from '@/hooks';

const AdminProtectedRoute = ({ children, type }) => {
  const { id } = useParams();
  const { data: myData, isLoading } = useMyProfile();

  if (isLoading) return null;

  const targetId = Number(id);

  const hasPermission =
    type === 'booth'
      ? myData?.managed_booths?.some((booth) => booth.id === targetId)
      : myData?.managed_shows?.some((show) => show.id === targetId);

  if (!hasPermission) {
    return <Navigate to="/admin/confirm" replace />;
  }

  return children;
};

export default AdminProtectedRoute;
