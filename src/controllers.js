const { validationResult, check } = require('express-validator');
const { User, Employee } = require('./models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');

// Configure multer for image uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

const validateUserAndEmployee = [
    check('username').notEmpty().withMessage('Username is required'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    check('email').isEmail().withMessage('Enter a valid email address'),
    check('mobile').isMobilePhone().withMessage('Enter a valid mobile number'),
];

const handleErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

const createEmployee = [
    upload.single('image'),
    validateUserAndEmployee,
    handleErrors,
    async (req, res) => {
        const { username, password, id, name, email, mobile, designation, gender, course } = req.body;

        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({ username, password: hashedPassword });
            await user.save();

            const employee = new Employee({
                 name, email, mobile, designation, gender, course, 
                image: req.file ? req.file.path : null, 
                createdBy: user._id
            });
            await employee.save();

            res.status(201).json({ message: 'User and Employee created successfully' });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
];

const login = (req, res) => {
    const { username, password } = req.body;
    User.findOne({ username })
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = jwt.sign({ userId: user._id, username: user.username }, 'secret_key', { expiresIn: '1h' });
                res.json({ token });
            } else {
                res.status(401).json({ message: 'Invalid credentials' });
            }
        })
        .catch(err => res.status(500).json({ error: err.message }));
};

const getEmployees = (req, res) => {
    const { page = 1, limit = 10, search = '', isActive } = req.query;
    const query = { $or: [{ name: new RegExp(search, 'i') }, { email: new RegExp(search, 'i') }] };
    if (isActive !== undefined) {
        query.isActive = isActive === 'true';
    }
    Employee.find(query)
        .sort({ name: 1, email: 1 })
        .skip((page - 1) * limit)
        .limit(parseInt(limit))
        .then(employees => res.json(employees))
        .catch(err => res.status(500).json({ error: err.message }));
};

const editEmployee = [
    validateUserAndEmployee,
    handleErrors,
    (req, res) => {
        const { id } = req.params;
        const { email, mobile } = req.body;
        const updates = { ...req.body };
        if (email) {
            updates.email = email;
        }
        if (mobile) {
            updates.mobile = mobile;
        }
        Employee.findByIdAndUpdate(id, updates, { new: true })
            .then(employee => res.json(employee))
            .catch(err => res.status(400).json({ error: err.message }));
    }
];

const deleteEmployee = (req, res) => {
    const { id } = req.params;
    Employee.findByIdAndDelete(id)
        .then(() => res.json({ message: 'Employee deleted' }))
        .catch(err => res.status(500).json({ error: err.message }));
};

module.exports = { createEmployee, login, getEmployees, editEmployee, deleteEmployee };
