const express = require("express");
const pool = require("../db");
const { getStrength, calculateRetention } = require("../retention");
const rescheduleMissed = require("../rescheduler");

const router = express.Router();

/**
 * CREATE TOPIC
 */
router.post("/", async (req, res) => {
  const { topic, difficulty, hours } = req.body;

  const result = await pool.query(
    "INSERT INTO study_topics (topic, difficulty, hours) VALUES ($1,$2,$3) RETURNING *",
    [topic, difficulty, hours]
  );

  res.json(result.rows[0]);
});

/**
 * GET ALL TOPICS
 */
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM study_topics ORDER BY id ASC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});


/**
 * UPDATE RETENTION
 */
router.post("/:id/retention", async (req, res) => {
  try {
    const { hoursPassed } = req.body;
    const { id } = req.params;

    // simple decay model (temporary)
    const decay = hoursPassed * 2; // you can improve later

    const result = await pool.query(
      `UPDATE study_topics
       SET retention = GREATEST(retention - $1, 0),
           last_studied = NOW()
       WHERE id = $2
       RETURNING *`,
      [decay, id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});


/**
 * RESCHEDULE MISSED REVISION
 */
router.post("/:id/missed", async (req, res) => {
  const { missedMinutes } = req.body;

  const chunks = rescheduleMissed(missedMinutes);

  res.json({
    message: "Revision rescheduled",
    chunks,
  });
});

module.exports = router;
