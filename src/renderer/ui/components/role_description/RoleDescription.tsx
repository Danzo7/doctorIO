import './style/index.scss';
interface RoleDescriptionProps {
  roleName: string;
  description: string;
}
export default function RoleDescription({
  roleName,
  description,
}: RoleDescriptionProps) {
  return (
    <div className="role-description">
      <div className="header">
        <span className="roleName">{roleName}</span>
      </div>
      <div className="description-container">
        <span>{description}</span>
      </div>
    </div>
  );
}
