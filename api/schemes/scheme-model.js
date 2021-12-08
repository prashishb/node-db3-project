const db = require('../../data/db-config');

async function find() {
  const rows = await db('schemes as sc')
    .leftJoin('steps as st', 'sc.scheme_id', 'st.scheme_id')
    .select('sc.*')
    .count('st.step_id as number_of_steps')
    .groupBy('sc.scheme_id')
    .orderBy('sc.scheme_id', 'asc');
  return rows;
}

async function findById(scheme_id) {
  const rows = await db('schemes as sc')
    .leftJoin('steps as st', 'sc.scheme_id', 'st.scheme_id')
    .select('sc.scheme_name', 'st.*')
    .where('sc.scheme_id', scheme_id)
    .orderBy('st.step_number', 'asc');

  if (!rows.length) {
    return null;
  }

  return {
    scheme_id: rows[0].scheme_id,
    scheme_name: rows[0].scheme_name,
    steps: rows
      .filter((row) => row.step_id)
      .map(({ step_id, step_number, instructions }) => ({
        step_id,
        step_number,
        instructions,
      })),
  };
}

async function findSteps(scheme_id) {
  const rows = await db('steps as st')
    .join('schemes as sc', 'st.scheme_id', 'sc.scheme_id')
    .select('st.step_id', 'st.step_number', 'st.instructions', 'sc.scheme_name')
    .where('sc.scheme_id', scheme_id)
    .orderBy('st.step_number', 'asc');
  return rows;
}

function add(scheme) {
  // EXERCISE D
  /*
    1D- This function creates a new scheme and resolves to _the newly created scheme_.
  */
}

function addStep(scheme_id, step) {
  // EXERCISE E
  /*
    1E- This function adds a step to the scheme with the given `scheme_id`
    and resolves to _all the steps_ belonging to the given `scheme_id`,
    including the newly created one.
  */
}

module.exports = {
  find,
  findById,
  findSteps,
  add,
  addStep,
};
