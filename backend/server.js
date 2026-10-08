const express = require("express");
const cors = require("cors");
const hostelAdminRoutes = require('./routes/hostelAdminRoutes');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use('/api/hostel-admin', hostelAdminRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "HostelHub Backend is running!"
    });
});

app.listen(PORT, () => {
    console.log(`HostelHub server running on http://localhost:${PORT}`);
});