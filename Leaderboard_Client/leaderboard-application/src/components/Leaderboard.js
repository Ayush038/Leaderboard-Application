import React from "react";
import "../style/Leaderboard.css";

const Leaderboard = ({ flipTo, users }) => {
  return (
    <div className="leaderboard-container">
      <h1 className="heading">🏆 Leaderboard</h1>
      <div className="cards-wrapper">
        <div className="pyramid-row">
          {users[0] && (
            <div key={users[0]._id} className="user-card first">
              <div className="info">
                <div className="name">{users[0].name}</div>
                <div className="points">{users[0].totalPoints} pts</div>
              </div>
            </div>
          )}
        </div>
        <div className="pyramid-row">
          {users.slice(1, 3).map((user, index) => (
            <div
              key={user._id}
              className={`user-card ${index === 0 ? "second" : "third"}`}
            >
              <div className="info">
                <div className="name">{user.name}</div>
                <div className="points">{user.totalPoints} pts</div>
              </div>
            </div>
          ))}
        </div>
        <div className="pyramid-row">
          {users.slice(3, 6).map((user) => (
            <div key={user._id} className="user-card">
              <div className="info">
                <div className="name">{user.name}</div>
                <div className="points">{user.totalPoints} pts</div>
              </div>
            </div>
          ))}
        </div>
        <div className="pyramid-row">
          {users.slice(6, 10).map((user) => (
            <div key={user._id} className="user-card">
              <div className="info">
                <div className="name">{user.name}</div>
                <div className="points">{user.totalPoints} pts</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="leaderboard-buttons">
        <button className="glow-button" onClick={() => flipTo("addUser")}>
          ➕ Add User
        </button>
        <button className="glow-button" onClick={() => flipTo("addCredit")}>
          ⚡ Add Credit
        </button>
      </div>
    </div>
  );
};

export default Leaderboard;
