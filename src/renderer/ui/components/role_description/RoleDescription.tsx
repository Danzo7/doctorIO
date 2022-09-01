import './style/index.scss';
interface RoleDescriptionProps {
  name: string;
  description?: string;
}
export default function RoleDescription({
  name: roleName,
  description,
}: RoleDescriptionProps) {
  return (
    <div className="role-description">
      <div className="header">
        <span className="roleName">{roleName}</span>
      </div>
      <div className="description-container">
        {description && <span>{description}</span>}
      </div>
    </div>
  );
}
