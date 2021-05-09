//Method to create Build Profile
const buildProfile = ({
  name,
  email,
  designation,
  createdAt,
  phone,
  isVerified,
}) => {
  return {
    name: name,
    email: email,
    designation: designation,
    createdAt: createdAt,
    phone: phone,
    isVerified: isVerified,
  };
};

module.exports=buildProfile;
