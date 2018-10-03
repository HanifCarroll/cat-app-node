const authRoutes = require("express").Router();

const auth = require("./index");
const { User } = require("../sequelize");

module.exports = (() => {
  authRoutes.post("/register", async (req, res) => {
    let { email, password } = req.body;

    auth.userPool.signUp(email, password, null, null, async (err, result) => {
      if (err) {
        console.log(err);
        return res.status(400).send({ error: err.message });
      }
      const cognitoUser = result.user;
      const user = await User.create({ email });

      console.log("user name is " + cognitoUser.getUsername());
      res.status(200).send({ user });
    });
  });

  authRoutes.post("/login", async (req, res) => {
    const { email, password } = req.body;
    // const failMessage = { error: "Incorrect credentials." };

    // const user = await User.find({ where: { email } });
    // if (!user) return res.status(401).send(failMessage);

    // const verified = await bcrypt.compare(password, user.password);
    // if (!verified) return res.status(401).send(failMessage);

    // res.status(200).send({ user });

    const authDetails = auth.authDetails(email, password);
    const cognitoUser = auth.cognitoUser(email);

    cognitoUser.authenticateUser(authDetails, {
      onSuccess: result => {
        console.log(result);
      },
      onFailure: err => {
        console.log(err);
      }
    });
  });

  return authRoutes;
})();
