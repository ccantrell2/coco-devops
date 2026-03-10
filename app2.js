// CREATE - Add a new student (PROTECTED)
app.post('/api/students', authenticateToken, async (req, res) => {
  try {
    const { name, age, grade } = req.body;

    // Simple validation
    if (!name || !age || !grade) {
      return res.status(400).json({ error: 'Name, age, and grade are required' });
    }

    const student = {
      name,
      age: parseInt(age),
      grade,
      createdBy: req.user.username, // Track who created this student
      createdAt: new Date()
    };
    const result = await db.collection('students').insertOne(student);

    console.log(`✅ Student created by ${req.user.username}: ${name}`);

    res.status(201).json({
      message: 'Student created successfully',
      studentId: result.insertedId,
      student: { ...student, _id: result.insertedId }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create student: ' + error.message });
  }
});

// READ - Get all students (PROTECTED)
app.get('/api/students', authenticateToken, async (req, res) => {
  try {
    const students = await db.collection('students').find({}).toArray();
    console.log(`📋 ${req.user.username} viewed ${students.length} students`);
    res.json(students); // Return just the array for frontend simplicity
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch students: ' + error.message });
  }
});

// UPDATE - Update a student by ID (PROTECTED)
app.put('/api/students/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age, grade } = req.body;

    // Validate ObjectId
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid student ID' });
    }

    const updateData = { updatedBy: req.user.username, updatedAt: new Date() };
    if (name) updateData.name = name;
    if (age) updateData.age = parseInt(age);
    if (grade) updateData.grade = grade;

    const result = await db.collection('students').updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }

    console.log(`✏️ Student updated by ${req.user.username}: ${id}`);

    res.json({
      message: 'Student updated successfully',
      modifiedCount: result.modifiedCount
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update student: ' + error.message });
  }
});

// DELETE - Delete a student by ID (PROTECTED)
app.delete('/api/students/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid student ID' });
    }

    const result = await db.collection('students').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }

    console.log(`🗑️ Student deleted by ${req.user.username}: ${id}`);

    res.json({
      message: 'Student deleted successfully',
      deletedCount: result.deletedCount
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete student: ' + error.message });
  }
});

// SEED - Add sample data for teaching (PROTECTED)
app.post('/api/seed', authenticateToken, async (req, res) => {
  try {
    // First, clear existing data
    await db.collection('students').deleteMany({});

    // Sample students for teaching
    const sampleStudents = [
      { name: "Alice Johnson", age: 20, grade: "A", createdBy: req.user.username, createdAt: new Date() },
      { name: "Bob Smith", age: 19, grade: "B+", createdBy: req.user.username, createdAt: new Date() },
      { name: "Charlie Brown", age: 21, grade: "A-", createdBy: req.user.username, createdAt: new Date() },
      { name: "Diana Prince", age: 18, grade: "A+", createdBy: req.user.username, createdAt: new Date() },
      { name: "Edward Norton", age: 22, grade: "B", createdBy: req.user.username, createdAt: new Date() },
      { name: "Fiona Apple", age: 19, grade: "A", createdBy: req.user.username, createdAt: new Date() },
      { name: "George Wilson", age: 20, grade: "C+", createdBy: req.user.username, createdAt: new Date() },
      { name: "Hannah Montana", age: 18, grade: "B-", createdBy: req.user.username, createdAt: new Date() }
    ];

    const result = await db.collection('students').insertMany(sampleStudents);

    console.log(`🌱 Database seeded by ${req.user.username}: ${result.insertedCount} students`);

    res.json({
      message: `Database seeded successfully! Added ${result.insertedCount} sample students.`,
      insertedCount: result.insertedCount
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to seed database: ' + error.message });
  }
});

// CLEANUP - Remove all student data (PROTECTED)
app.delete('/api/cleanup', authenticateToken, async (req, res) => {
  try {
    const result = await db.collection('students').deleteMany({});

    console.log(`🧹 Database cleaned by ${req.user.username}: ${result.deletedCount} students removed`);

    res.json({
      message: `Database cleaned successfully! Removed ${result.deletedCount} students.`,
      deletedCount: result.deletedCount
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to cleanup database: ' + error.message });
  }
});
