exports.getMe = (req, res) => {
    try {
      const user = req.user;
      res.status(200).json({ 
        id: user.id, 
        username: user.username, 
        email: user.email, 
        role: user.role 
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve user information.' });
    }
  };
  