import API from "../api/api";
import React, { useState, useEffect } from 'react';
import Leaderboard from './Leaderboard';
import AddUser from "./addUserForm";
import AddCredits from "./addCredit";
import '../style/FlipWrapper.css';

const FlipWrapper = () => {

    const [view, setView] = useState('leaderboard');
    const [leaderboardUsers, setLeaderboardUsers] = useState([]);
    const [allUsers, setAllUsers] = useState([]);

    const fetchLeaderboard = async () => {
        try {
        const res = await API.get("/leaderboard");
        setLeaderboardUsers(res.data);
        } catch (err) {
        console.error("Failed to fetch leaderboard", err);
        }
    };

    const fetchAllUsers = async () => {
        try {
        const res = await API.get("/users");
        setAllUsers(res.data);
        } catch (err) {
        console.error("Failed to fetch users", err);
        }
    };

    useEffect(() => {
        fetchLeaderboard();
        fetchAllUsers();
    }, []);

    const flipTo = (side) => {
        if (side === "leaderboard") {
        fetchLeaderboard();
        }
        if (side === "addCredit") {
        fetchAllUsers();
        }
        setView(side);
    };

    return (
        <div className={`flip-wrapper ${view}`}>
        <div className="card">
            <div className="front">
            <Leaderboard flipTo={flipTo} users={leaderboardUsers} />
            </div>
            <div className="left">
            <AddUser flipTo={flipTo} />
            </div>
            <div className="right">
            <AddCredits flipTo={flipTo} users={allUsers} />
            </div>
        </div>
        </div>
    );
};

export default FlipWrapper;
