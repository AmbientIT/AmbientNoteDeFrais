import React, { Component, PropTypes } from 'react'
import { Form } from 'formsy-react'
import { FormsyDate, FormsyText } from 'formsy-material-ui/lib'
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'
import radium from 'radium'
import style from './noteForm.style'

const { shape, string, instanceOf, func } = PropTypes
@radium()
export class NoteForm extends Component {
  static contextTypes = {
    locale: string,
  }

  state = {
    canSubmit: false,
    files: [],
  }

  errorMessages = {
    wordsError: 'Please only use letters',
  }

  enableButton = () => {
    this.setState({
      canSubmit: true,
    })
  }

  disableButton = () => {
    this.setState({
      canSubmit: false,
    })
  }

  notifyFormError = (data) => {
    console.error('Form error:', data)
  }

  render() {
    const { wordsError } = this.errorMessages
    const { note, submitForm } = this.props
    return (
      <Paper zDepth={3}>
        <Form
          onValid={this.enableButton}
          onInvalid={this.disableButton}
          onValidSubmit={submitForm}
          onInvalidSubmit={this.notifyFormError}
          style={style.form}
        >
          <div style={style.inputContainer}>
            <FormsyText
              style={style.input}
              name="name"
              validations="isWords"
              validationError={wordsError}
              required
              value={note.name}
              hintText="Nommer la note de frais"
              floatingLabelText="Titre"
            />
          </div>
          <div style={style.inputContainer}>
            <FormsyDate
              style={style.input}
              name="date"
              required
              value={note.date}
              floatingLabelText="Date"
              locale={this.context.locale}
              DateTimeFormat={Intl.DateTimeFormat}
              okLabel="OK"
              cancelLabel="Annuler"
            />
          </div>
          <div style={style.inputContainer}>
            <RaisedButton
              style={style.input}
              type="submit"
              label="Submit"
              disabled={!this.state.canSubmit}
            />
          </div>
        </Form>
      </Paper>
    )
  }
}

NoteForm.propTypes = {
  note: shape({
    name: string,
    date: instanceOf(Date),
  }),
  submitForm: func,
}

NoteForm.defaultProps = {
  note: {},
  submitForm: () => {},
}
