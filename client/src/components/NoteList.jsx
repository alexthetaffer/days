import React from "react";
import format from "date-fns/format";
import { sortByDate } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import { setActiveNote, createNote } from "../features/notes/noteSlice";
import { displayNotePage } from "../features/uiSlice";
import { formatISO } from "date-fns";

const MAX_PREVIEW_TEXT_LENGTH = 250;

const NoteList = ({}) => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes.notes);
  const activeTag = useSelector((state) => state.tags.activeTag);
  const tags = useSelector((state) => state.tags.tags);

  function removeTags(str) {
    if (!str || str === "") return false;
    else str = str.toString();

    return str.replace(/(<([^>]+)>)/gi, " ");
  }

  const onCreateNote = async () => {
    const newNote = {
      title: "",
      text: "",
      date: formatISO(new Date(), { representation: "date" }),
      tagList: activeTag ? [activeTag._id] : [],
    };
    await dispatch(createNote(newNote));
    dispatch(displayNotePage());
  };

  const getNotesByTag = function (notes, tag) {
    const notesFiltered = notes.filter((note) => note.tagList.includes(tag));
    return notesFiltered;
  };

  const handleNoteClick = function (noteId) {
    const noteToOpen = notes.find((note) => note._id === noteId);
    dispatch(setActiveNote(noteToOpen));
    dispatch(displayNotePage());
  };

  const taggedNotes = activeTag ? getNotesByTag(notes, activeTag._id) : notes;
  const notesToDisplay = [...taggedNotes].sort(sortByDate);
  if (!notesToDisplay || notesToDisplay.length === 0)
    return (
      <div>
        <div className="header">
          <div className="left">
            <div className="header-title">
              {activeTag ? activeTag.name : "Timeline"}
            </div>
          </div>
          <div className="right"></div>
        </div>
        <div className="main-empty">
          No entries
          <button id="headerNewNote" onClick={onCreateNote}>
            <span
              className="material-symbols-outlined black"
              style={{ fontSize: "1.5rem" }}
            >
              add
            </span>
          </button>
        </div>
      </div>
    );

  let currentDate = notesToDisplay[0].date
    ? new Date(notesToDisplay[0].date)
    : new Date();

  return (
    <>
      <div className="header">
        <div className="left">
          <div className="header-title">
            {activeTag ? activeTag.name : "Timeline"}
          </div>
        </div>
        <div className="right"></div>
      </div>

      <div className="note-container">
        <button id="headerNewNote" onClick={onCreateNote}>
          <span
            className="material-symbols-outlined black"
            style={{ fontSize: "1.5rem" }}
          >
            add
          </span>
        </button>
        <h1 className="month-header">
          {format(currentDate, "MMMM")} {format(currentDate, "y")}
        </h1>
        {notesToDisplay.map((note) => {
          const date = note.date ? new Date(note.date) : new Date();
          let text = removeTags(note.text);
          if (text.length > MAX_PREVIEW_TEXT_LENGTH) {
            text = text.substring(0, MAX_PREVIEW_TEXT_LENGTH - 1) + "...";
          }
          let month = null;
          let year = null;
          if (
            format(currentDate, "M") !== format(date, "M") ||
            format(currentDate, "y") !== format(date, "y")
          ) {
            month = format(date, "MMMM");
            year = format(date, "y");
            currentDate = date;
          }
          return (
            <div key={note._id}>
              {month ? (
                <h1 className="month-header">
                  {month} {year}
                </h1>
              ) : (
                ""
              )}
              <div
                className="note-card"
                onClick={() => handleNoteClick(note._id)}
              >
                <h1>{note.title}</h1>
                <p>{text}</p>
                <div className="card-bottom-panel">
                  <div className="card-date">{format(date, "dd MMMM y")}</div>
                  {note?.tagList?.map((tagId) => {
                    const tag = tags.find((tag) => tag._id === tagId)?.name;
                    if (tag) {
                      return (
                        <div key={tagId} className="tag-box">
                          {tags.find((tag) => tag._id === tagId)?.name}
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default NoteList;
