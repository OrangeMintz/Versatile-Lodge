import React, { useContext, useEffect, useState } from 'react';
import './receptions.css';
import HeaderAdmin from '../../components/HeaderAdmin';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import { UserContext } from '../../components/userContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import Loader from '../../components/Loader';
import Error from '../../components/Error';

const Receptions = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [receptionsData, setReceptionsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [operationsComplete, setOperationsComplete] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    if (!user) {
      axios
        .get('/profile/admin')
        .then(({ data }) => {
          setUser(data);
        })
        .catch((error) => {
          console.error('Error fetching user profile:', error);
          setError(error);
        })
        .finally(() => {
          setOperationsComplete(true); // Mark operations as complete
        });
    } else {
      setOperationsComplete(true); // Mark operations as complete if user already exists
    }
  }, [user, setUser]);

  useEffect(() => {
    // Redirect unauthorized users or receptionists
    if (operationsComplete && !user) {
      navigate('/401');
      toast.error("Unauthorized Access");
    } else if (operationsComplete && user && user.isEmployee === true) {
      navigate('/dashboard');
      toast.error("Unauthorized Access");
    }
  }, [user, operationsComplete, navigate]);

  useEffect(() => {
    // Fetch reception data after user is logged in
    if (user) {
      axios
        .get('/api/reception/')
        .then(({ data }) => {
          setReceptionsData(data);
        })
        .catch((error) => {
          console.error('Error fetching reception data:', error);
          setError(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [user]);

  const deleteAllReceptions = async () => {
    try {
      await axios.delete('/api/reception/delete');
      console.log('All receptions deleted successfully.');
    } catch (error) {
      console.error('Error deleting receptions:', error);
    }
  };

  return (
    <div className="receptionContainer">
      <HeaderAdmin />
      <Sidebar />
      <section className="receptions">
        <h1 className="heading">Reception Desks</h1>
        {loading && <Loader />}
        {error && <Error />}
        {!loading && !error && (
          <div className="box-container">
            {receptionsData.map((reception) => (
              <div key={reception._id} className="box">
                <div className="reception">
                  <img src={reception.image} alt="" />
                  <div>
                    <h3>{reception.name}</h3>
                    <span>{reception.role}</span>
                  </div>
                </div>
                <p>
                  Branch : <span>{reception.branch}</span>
                </p>
                <p>
                  Total Transaction/s : <span>{reception.totalTransactions}</span>
                </p>
                <p>
                  Call Number: <span>{reception.phoneNumber}</span>
                </p>
                {/* <a href="reception-profile.html" className="inline-btn">
                    view profile
                  </a> */}
              </div>
            ))}
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
};

export default Receptions;
