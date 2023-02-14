const validate = (values : any)  => {
    const errors: any = {}
    if (!values.firstName) {
      errors.firstName = 'Required'
    }
    if (!values.lastName) {
      errors.lastName = 'Required'
    }
    if (values.employed) {
      errors.employed = "We're only accepted unemployed applicants at the moment"
    }
    if (!values.favoriteColor) {
      errors.favoriteColor = 'Required'
    } else if (values.favoriteColor === '#00ff00') {
      errors.favoriteColor = 'Not green! Gross!'
    }
    return errors
  }
  export default validate