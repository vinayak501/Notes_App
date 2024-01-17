import React, { useEffect } from "react";
import MainScreen from "../../components/MainScreen";
import { Link, useNavigate } from "react-router-dom";
import { Badge, Button, Card, useAccordionButton } from "react-bootstrap";
import { Accordion } from "react-bootstrap";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, listNotes } from "../../actions/notesActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import ReactMarkdown from "react-markdown";

function CustomToggle({ children, eventKey }) {
  const decoratedOnClick = useAccordionButton(eventKey, () =>
    console.log("totally custom!")
  );

  return (
    <button
      type="button"
      onClick={decoratedOnClick}
      style={{ backgroundColor: "transparent", border: "none" }}
    >
      {children}
    </button>
  );
}

const MyNotes = ({ search }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const noteList = useSelector((state) => state.noteList);
  const { loading, notes, error } = noteList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { success: successUpdate } = noteUpdate;

  const noteDelete = useSelector((state) => state.noteDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = noteDelete;

  const deleteHandler = (id) => {
    if (window.confirm("Are you Sure?")) {
      dispatch(deleteNoteAction(id));
    }
  };

  const noteCreate = useSelector((state) => state.noteCreate);
  const { success: successCreate } = noteCreate;

  useEffect(() => {
    dispatch(listNotes());
    if (!userInfo) {
      navigate("/");
    }
  }, [
    dispatch,
    successCreate,
    navigate,
    userInfo,
    successUpdate,
    successDelete,
  ]);

  return (
    <MainScreen title={`Welcome ${userInfo.name}`}>
      <Link to="/createnote">
        <Button style={{ marginBottom: 6, marginLeft: 0 }} size="lg">
          Create New Note
        </Button>
      </Link>
      {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )}
      {loadingDelete && <Loading />}
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}
      {notes
        ?.reverse()
        .filter((filteredNote) =>
          filteredNote.title.toLowerCase().includes(search.toLowerCase())
        )
        .map((note) => (
          <Accordion key={note._id}>
            <Card style={{ marginTop: 8 }}>
              <Card.Header style={{ display: "flex" }}>
                <span
                  style={{
                    color: "black",
                    textDecoration: "none",
                    flex: 1,
                    cursor: "pointer",
                    alignSelf: "center",
                    fontSize: 18,
                  }}
                >
                  <CustomToggle eventKey="0">{note.title}</CustomToggle>
                </span>
                <Button href={`/note/${note._id}`}>
                  <Link to={`/note/${note._id}`}>
                    <EditIcon />
                  </Link>
                </Button>
                <Button
                  variant="danger"
                  className="mx-2"
                  onClick={() => deleteHandler(note._id)}
                >
                  <DeleteIcon />
                </Button>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <h4>
                    <Badge bg="success" style={{ color: "white" }}>
                      Category - {note.category}
                    </Badge>
                  </h4>
                  <blockquote className="blockquote mb-0">
                    <p>
                      <ReactMarkdown>{note.content}</ReactMarkdown>
                    </p>
                    <footer className="blockquote-footer">
                      "Created On"
                      <cite title="Source Title">
                        {note.createdAt.substring(0, 10)}
                      </cite>
                    </footer>
                  </blockquote>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        ))}
    </MainScreen>
  );
};

export default MyNotes;
