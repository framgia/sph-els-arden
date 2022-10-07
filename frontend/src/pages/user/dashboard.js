import React, { useEffect, useState, useContext } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import { ArrowLeftCircle } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { domain } from "../../services/apis";

import {
  getCurrentProfile,
  getLearnedWords,
} from "../../services/profileService";
import { UserContext } from "../../utils/userContext";
import avatarPlaceholder from "../../asset/avatar_placeholder.png";
import WordsPanel from "../../components/learnedWordsPanel";
import ActivitiesPanel from "../../components/activitiesPanel";

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [showWords, setShowWords] = useState(false);
  const [learnedWords, setLearnedWords] = useState();
  const [profile, setProfile] = useState();
  const [loading, setLoading] = useState(true);

  const openWordsPanel = () => {
    setShowWords(true);
  };

  useEffect(() => {
    getCurrentProfile().then(({ data }) => {
      setProfile(data);
    });

    getLearnedWords(user.id).then(({ data }) => {
      setLearnedWords(data);
    });
  }, []);

  useEffect(() => {
    if (profile && learnedWords) {
      setLoading(false);
    }
  }, [profile, learnedWords]);

  return !loading ? (
    <Container>
      <h1>Dashboard</h1>
      <Row>
        <Col md={3}>
          <Row>
            <Col md="auto">
              <Image
                src={domain + profile.profile.avatar || avatarPlaceholder}
                style={{ width: "6rem" }}
              />
            </Col>
            <Col md="auto">
              <p className="text-capitalize fs-3">
                {profile.user.first_name} {profile.user.last_name}
              </p>
              <Link onClick={openWordsPanel}>
                Learned {profile.profile.total_words_learned} words
              </Link>
              <br />
              <p>Learned {profile.profile.total_lessons_learned} lessons</p>
            </Col>
          </Row>
        </Col>
        <Col>
          {showWords ? (
            <React.Fragment>
              <div
                className="ms-4 mb-2 d-flex align-items-center"
                style={{ cursor: "pointer" }}
                onClick={() => setShowWords(false)}
              >
                <ArrowLeftCircle size={30} />
                <h4 className="ms-2">Go Back</h4>
              </div>
              <WordsPanel data={learnedWords} />
            </React.Fragment>
          ) : (
            <ActivitiesPanel all={true} />
          )}
        </Col>
      </Row>
    </Container>
  ) : null;
};

export default Dashboard;
