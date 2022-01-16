import React, { useContext } from 'react';
import { AuthContext } from '../context/auth';
import { useNavigate } from 'react-router-dom';

import { Container, Button } from '@mui/material';

import { gql, useMutation } from '@apollo/client';
const DELETE_LESSON = gql`
  mutation deleteLesson($lessonId: ID!) {
    deleteLesson(lessonId: $lessonId)
  }
`;

export default function ButtonAuth({ lesson, idx }) {
  const { user } = useContext(AuthContext);
  const teachers = user.teachers.flatMap((teacher) => teacher.username);
  const navigate = useNavigate();
  const [deleteLesson] = useMutation(DELETE_LESSON, {
    variables: { lessonId: lesson.id },
    update(_, result) {
      alert(result.data.deleteLesson);
    },
    onError(err) {
      console.log({ err });
    },
  });

  return (
    <Container>
      {!user ? (
        <Button onClick={() => navigate('/login', { replace: true })}>
          Sign Up
        </Button>
      ) : teachers.includes(user.username) ? (
        <>
          <Button
            onClick={() =>
              navigate(`/edit-event/${lesson.id}`, { replace: true })
            }>
            Edit
          </Button>
          <Button
            onClick={deleteLesson}
            variant='contained'
            sx={{ ml: 2, mt: 1, mb: 2 }}>
            Delete
          </Button>
        </>
      ) : (
        <Button
          onClick={() => navigate(`/signup/${lesson.id}`, { replace: true })}>
          Sign Up
        </Button>
      )}
    </Container>
  );
}