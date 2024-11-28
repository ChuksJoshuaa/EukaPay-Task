
export function getPasswordValidators() {
  return [
    {
      validator: function(v: string) {
        return /[a-z]/.test(v);
      },
      message: "Password must contain at least one lowercase letter"
    },
    {
      validator: function(v: string) {
        return /[A-Z]/.test(v);
      },
      message: "Password must contain at least one uppercase letter"
    },
    {
      validator: function(v: string) {
        return /\d/.test(v);
      },
      message: "Password must contain at least one digit"
    },
    {
      validator: function(v: string) {
        return /^(?=.*[a-zA-Z]).{8,}$/.test(v);
      },
      message: "Password must be at least 8 characters long and include letters"
    }
  ];
}

export function getEmailValidator() {
  return {
    validator: function(v: string) {
      return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v);
    },
    message: "Please provide a valid email"
  };
}
