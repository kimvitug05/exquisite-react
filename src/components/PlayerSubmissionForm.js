import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './PlayerSubmissionForm.css';

const PlayerSubmissionForm = (props) => {
  const [formFields, setFormFields] = useState({
    adj1: '',
    noun1: '',
    adv: '',
    verb: '',
    adj2: '',
    noun2: ''
  });

  const onInputChange = (event) => {
    const newFormFields = {
      ...formFields,
    }

    newFormFields[event.target.name] = event.target.value;
    setFormFields(newFormFields);
  };

  const isValidInput = (val) => {
    return val.length
  }

  const formSubmission = () => props.fields.map(field => {
    if (typeof field === 'object') {
      return formFields[field.key]
    }
    return field
  }).join(' ')

  const onFormSubmit = (event) => {
    // prevent the browser from trying to submit the form.
    event.preventDefault();
    props.sendSubmission(formSubmission());

    setFormFields({
      adj1: '',
      noun1: '',
      adv: '',
      verb: '',
      adj2: '',
      noun2: ''
    });
  };

  return (
    <div className="PlayerSubmissionForm">
      <h3>Player Submission Form for Player #{ props.index + 1 }</h3>

      <form className="PlayerSubmissionForm__form" onSubmit={ onFormSubmit } >

        <div className="PlayerSubmissionForm__poem-inputs">

          {
            props.fields.map((field, index) => {

              if (typeof field === 'object') {
                return(
                  <input
                    key={ index }
                    value={ formFields[field.key] }
                    name={ field.key }
                    placeholder={ field.placeholder }
                    type="text" 
                    onChange={ onInputChange }
                    className={ isValidInput(formFields[field.key]) ? 'PlayerSubmissionForm__input' : 'PlayerSubmissionForm__input--invalid' }
                  />
                )
              } else {
                return(
                  <span key={ index }>
                    { field }
                  </span>
                )
              }
            })
          }

        </div>

        <div className="PlayerSubmissionForm__submit">
          <input type="submit" value="Submit Line" className="PlayerSubmissionForm__submit-btn" />
        </div>
      </form>
    </div>
  );
}

PlayerSubmissionForm.propTypes = {
  index: PropTypes.number.isRequired,
  sendSubmission: PropTypes.func.isRequired,
  fields: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      placeholder: PropTypes.string.isRequired,
    }),
  ])).isRequired,
}

export default PlayerSubmissionForm;
