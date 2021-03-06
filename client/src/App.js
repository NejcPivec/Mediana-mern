import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./components/Navigation";

import { Container, Row, Col } from "react-bootstrap";
import SurveyForm from "./components/SurveyForm";
import Surveys from "./components/Surveys";
import Loading from "./components/Loading";
import UpdateSurveyFrom from "./components/UpdateSurveyFrom";

function App() {
  const [allSurveys, setAllSurveys] = useState([]);
  const [singleSurvey, setSingleSurvey] = useState({});

  useEffect(() => {
    getAllSurveys();
  }, []);

  const getAllSurveys = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/survey");
      setAllSurveys(data);
    } catch (err) {
      console.error(err);
    }
  };

  const getSingleSurvey = async (id) => {
    try {
      const { data } = await axios.get(`http://localhost:5000/survey/${id}`);
      setSingleSurvey(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Navigation />
      <Container>
        <Row className="margin-top">
          <Col lg={5}>
            {Object.keys(singleSurvey).length === 0 ? (
              <SurveyForm />
            ) : (
              <UpdateSurveyFrom singleSurvey={singleSurvey} />
            )}
          </Col>
          <Col lg={7}>
            {allSurveys.length > 0 ? (
              <div>
                <h5>Created surveys</h5>
                {allSurveys.map((survey, index) => (
                  <Surveys
                    key={index}
                    singleSurvey={survey}
                    getSingleSurvey={getSingleSurvey}
                  />
                ))}
              </div>
            ) : (
              <Loading />
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
