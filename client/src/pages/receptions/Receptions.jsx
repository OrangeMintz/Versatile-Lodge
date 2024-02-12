import React, { useContext, useEffect, useState } from 'react';
import './receptions.css';
import HeaderAdmin from '../../components/HeaderAdmin';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import { UserContext } from '../../components/userContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Receptions = () => {

  // Check LOGON
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [operationsComplete, setOperationsComplete] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data including the role from the /profile endpoint
        const profileResponse = await axios.get('/profile/admin');
        setUser(profileResponse.data);

        // Fetch only archived employee data using the /admin/user endpoint with query parameters
        const employeeResponse = await axios.get('/admin/user', { params: { isArchive: false } });
        setData(employeeResponse.data);
        setOriginalData(employeeResponse.data); // Save the original data
      } catch (error) {
        console.error('Error fetching user or employee data:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [setUser]);

  // Check LOGON
  useEffect(() => {
    if (!user) {
      axios
        .get('/profile/admin')
        .then(({ data }) => {
          setUser(data);
        })
        .catch((error) => {
          console.error('Error fetching user profile:', error);
        })
        .finally(() => {
          // Set operationsComplete to true after data fetching is complete
          setOperationsComplete(true);
        });
    }
  }, [user, setUser]);

  useEffect(() => {
    if (operationsComplete && !user) {
      navigate('/401');
      toast.error("Unauthorized Access");
    }
    if (operationsComplete && user && user.isReceptionist === true) {
      toast.error("Unauthorized Access");
      navigate('/dashboard');
    }
    else if (operationsComplete && user && user.isReceptionist === true) {
      toast.error("Unauthorized Access");
      navigate('/dashboard');
    }
  }, [user, operationsComplete, navigate]);
  // Check LOGON
  return (
    <div className="receptionContainer">

      <HeaderAdmin />
      <Sidebar />
      <section className="receptions">
        <h1 className="heading">reception desks</h1>
        <div className="box-container">
          <div className="box">
            <div className="reception">
              <img src="/assets/images/charmee.gif" alt="" />
              <div>
                <h3>John Doe</h3>
                <span>Receptionist</span>
              </div>
            </div>
            <p>
              Branch : <span>Malaybalay</span>
            </p>
            <p>
              Total Transaction/s : <span>14</span>
            </p>
            <p>
              Call Number: <span>0912345679</span>
            </p>
            {/* <a href="reception-profile.html" className="inline-btn">
            view profile
          </a> */}
          </div>

          <div className="box">
            <div className="reception">
              <img src="/assets/images/finral.gif" alt="" />
              <div>
                <h3>John Doe</h3>
                <span>Receptionist</span>
              </div>
            </div>
            <p>
              Branch : <span>Valencia</span>
            </p>
            <p>
              Total Transaction/s : <span>4</span>
            </p>
            <p>
              Call Number : <span>0912346987</span>
            </p>
            {/* <a href="reception-profile.html" className="inline-btn">
            view profile
          </a> */}
          </div>

          <div className="box">
            <div className="reception">
              <img src="/assets/images/grey.gif" alt="" />
              <div>
                <h3>John Doe</h3>
                <span>Receptionist</span>
              </div>
            </div>
            <p>
              Branch : <span>Malaybalay</span>
            </p>
            <p>
              Total Transaction/s : <span>1</span>
            </p>
            <p>
              Call Number : <span>0912346987</span>
            </p>
            {/* <a href="reception-profile.html" className="inline-btn">
            view profile
          </a> */}
          </div>

          <div className="box">
            <div className="reception">
              <img src="/assets/images/luck.gif" alt="" />
              <div>
                <h3>John Doe</h3>
                <span>Receptionist</span>
              </div>
            </div>
            <p>
              Branch : <span>Maramag</span>
            </p>
            <p>
              Total Transaction/s : <span>9</span>
            </p>
            <p>
              Call Number : <span>0912346987</span>
            </p>
            {/* <a href="reception-profile.html" className="inline-btn">
            view profile
          </a> */}
          </div>

          <div className="box">
            <div className="reception">
              <img src="/assets/images/vanessa.gif" alt="" />
              <div>
                <h3>John Doe</h3>
                <span>Receptionist</span>
              </div>
            </div>
            <p>
              Branch : <span>Valencia</span>
            </p>
            <p>
              Total Transaction/s : <span>660</span>
            </p>
            <p>
              Call Number : <span>0912346987</span>
            </p>
            {/* <a href="reception-profile.html" className="inline-btn">
            view profile
          </a> */}
          </div>

          <div className="box">
            <div className="reception">
              <img src="/assets/images/yuno.gif" alt="" />
              <div>
                <h3>John Doe</h3>
                <span>Receptionist</span>
              </div>
            </div>
            <p>
              Branch : <span>Valencia</span>
            </p>
            <p>
              Total Transaction/s : <span>17</span>
            </p>
            <p>
              Call Number : <span>0912346987</span>
            </p>
            {/* <a href="reception-profile.html" className="inline-btn">
            view profile
          </a> */}
          </div>

        </div>

      </section>
      < Footer />
    </div>

  );
};

export default Receptions;