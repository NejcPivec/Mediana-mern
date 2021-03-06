import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import util from "util";

const UpdateSurveyFrom = ({ singleSurvey }) => {
  let [name, setName] = useState(singleSurvey.name);
  let [survey, setSurvey] = useState(singleSurvey.survey);

  const cleanJson = (dirty) => {
    return JSON.parse(
      dirty.replace(/\\n/g, "").replace(/\s+/g, "").replace(/\\/g, "")
    );
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      survey = cleanJson(survey);
      const newSurvey = { name, survey };

      await axios
        .put(
          `http://localhost:5000/survey/${singleSurvey._id}`,
          newSurvey,
          config
        )
        .then(
          (response) => {
            console.log(response);
          },
          (error) => {
            console.log(error);
          }
        );

      // Clear inputs
      e.target.reset();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group>
        <Form.Label>Survey name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Survey name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Survey json</Form.Label>
        <Form.Control
          as="textarea"
          rows={8}
          value={util.inspect(survey, { showHidden: false, depth: null })}
          onChange={(e) => setSurvey(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Update
      </Button>
    </Form>
  );
};

export default UpdateSurveyFrom;
