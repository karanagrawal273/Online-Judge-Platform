import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../css/Leaderboard.css';

const Leaderboard = () => {
  const [leaderboardData, setLeaderBoardData] = useState([]);
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/leaderboard`,
          {},
          {
            withCredentials: true,
          }
        );
        if (response.data.success) {
          setLeaderBoardData(response.data.results);
          console.log(response.data.results);
        } else {
          console.log(response.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchLeaderboard();
  }, []);

  return (
    <>
    <div className="leadNavbar">
      <Link to={'/'}>
        Home
      </Link>
      <Link to={'/problems'}>
        Problems
      </Link>
    </div>
    <h2>Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Total Problems Solved</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user.firstname}</td>
              <td>{user.lastname}</td>
              <td>{user.totalProblemsSolved}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Leaderboard;
