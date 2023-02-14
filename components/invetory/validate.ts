const validate = (values : any)  => {
    const errors: any = {}
    if (!values.product_name) {
      errors.product_name = 'Please select product name!'
    }
    if (!values.batch_number) {
      errors.batch_number = 'Please input batch number!'
    }
    if (!values.srp_price) {
      errors.srp_price = 'Please input srp price!'
    }
    if (!values.manufacture_price) {
      errors.manufacture_price = 'Please input manufacture price!'
    }
    if (!values.quantity) {
      errors.quantity = 'Please input quantity!'
    }
 
    if (!values.expiry_date) {
      errors.expiry_date = 'Please select expiry date!'
    }
 
    return errors
  }
  export default validate