CREATE TABLE Game(
  lobbyID VARCHAR(5),
  PRIMARY KEY(lobbyID)
);

CREATE TABLE Players(
  playerID VARCHAR(255),
  playerName VARCHAR(255),
  lobbyID VARCHAR(5),
  PRIMARY KEY(playerID)
);

ALTER TABLE Game ADD CONSTRAIN fk_lobby_id FOREIGN KEY(lobbyID) REFERENCES Players(lobbyID)