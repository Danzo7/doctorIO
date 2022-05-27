import { useNavigate, useLocation } from 'react-router-dom';

export default function useNavigation() {
  const navigate = useNavigate();
  const tree = useLocation().pathname.split('/');
  const toParent = () => {
    navigate(tree.slice(0, -1).join('/'), {
      replace: true,
    });
  };

  return { navigate, toParent };
}
