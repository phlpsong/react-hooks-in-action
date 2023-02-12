export default function UserDetail ({ user }) {
  return (
    <div>
      {user && (
        <div className="bookable-details">
          <div className="item">
            <div className="item-header">
              <h2>
                {user.title}
              </h2>
            </div>
            <p>{user.notes}</p>
          </div>
        </div>
      )}
    </div>
  );
}