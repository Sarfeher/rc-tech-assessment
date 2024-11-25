import { db } from "./db";

async function setup() {
  const database = await db;

  await database.exec(`
    DROP TABLE IF EXISTS statuses;
  `);

  await database.exec(`
    DROP TABLE IF EXISTS boards;
  `);

  //drop the tickets table if exist
  await database.exec(`
    DROP TABLE IF EXISTS tickets;
    `)

  await database.exec(`
    DROP INDEX IF EXISTS idx_statuses_board_id;
  `);

//add the key column to board
  await database.exec(`
    CREATE TABLE IF NOT EXISTS boards (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      description TEXT,
      key TEXT UNIQUE NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      deleted_at TIMESTAMP
    );
  `);

  await database.exec(`
    CREATE TABLE IF NOT EXISTS statuses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      board_id INTEGER NOT NULL,
      position INTEGER NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      deleted_at TIMESTAMP,
      FOREIGN KEY (board_id) REFERENCES boards(id),
      UNIQUE (name, board_id)
    );
  `);

  //create tickets table 
  await database.exec(`
    CREATE TABLE IF NOT EXISTS tickets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      board_id INTEGER NOT NULL,
      status_id INTEGER,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      deleted_at TIMESTAMP,
      FOREIGN KEY (board_id) REFERENCES boards(id),
      FOREIGN KEY (status_id) REFERENCES statuses(id)
    );
    `)

  await database.exec(`
    CREATE INDEX IF NOT EXISTS idx_statuses_board_id ON statuses(board_id);
  `);

  //add key's and key values
  await database.exec(`
    INSERT INTO boards (name, description, key) VALUES
    ('Alpha Project', 'Description for Project Alpha', 'ALP'),
    ('Beta Project', 'Description for Project Beta', 'BET'),
    ('Gamma Project', 'Description for Project Gamma', 'GAM'),
    ('Delta Project', 'Description for Project Delta', 'DEL');
  `);

  await database.exec(`
    INSERT INTO statuses (name, board_id, position) VALUES
    ('To Do', 1, 1),
    ('In Progress', 1, 2),
    ('Done', 1, 3),
    ('To Do', 2, 1),
    ('In Progress', 2, 2),
    ('Done', 2, 3),
    ('To Do', 3, 1),
    ('In Progress', 3, 2),
    ('Done', 3, 3),
    ('To Do', 4, 1),
    ('In Progress', 4, 2),
    ('Done', 4, 3);
  `);

  console.log("Database setup complete with default boards and statuses.");
}

setup().catch((err) => {
  console.error("Error setting up the database:", err);
});
