import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Button,
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

import { pokedex } from "../utils/pokedex";

const DetailDataGrid: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const pokemon = pokedex.find((p) => p.id === Number(id));

  if (!pokemon) {
    return (
      <Box p={3}>
        <Typography variant="h5">Pokemon not found</Typography>
        <Button variant="contained" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Button variant="contained" onClick={() => navigate(-1)}>
        Back to List
      </Button>
      <Card sx={{ mt: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          {pokemon.image?.thumbnail && (
            <CardMedia
              component="img"
              image={pokemon.image.thumbnail}
              alt={pokemon.name.english}
              sx={{ width: 300, height: 300 }}
            />
          )}
          <Box sx={{ display: "flex", flexDirection: "column", ml: 2 }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography variant="h4" gutterBottom>
                {pokemon.name.english}
              </Typography>
              <Typography variant="subtitle1">
                Species: {pokemon.species}
              </Typography>
              <Typography variant="subtitle1">
                Types: {pokemon.type.join(", ")}
              </Typography>
              <Typography variant="subtitle1">Base Stats:</Typography>
              {pokemon.base && (
                <ul>
                  {Object.entries(pokemon.base).map(([stat, value]) => (
                    <li key={stat}>
                      {stat}: {value}
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default DetailDataGrid;
