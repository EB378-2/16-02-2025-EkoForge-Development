"use client";

import React from "react";
import { getTheme } from "@theme/theme";
import { useColorMode } from "@contexts/color-mode";
import { Typography, Box } from "@mui/material";
import Navbar from "@components/Front/Navbar";
import Footer from "@components/Front/Footer";

export default function License() {
  const { mode } = useColorMode();
  const theme = getTheme(mode);

  return (
    <>
      <Navbar />
      <Box
        minHeight="100vh"
        sx={{
          backgroundColor: theme.palette.background.default,
          p: 4,
          overflowY: "auto",
        }}
      >
        <Typography variant="h3" gutterBottom>
          MIT License
        </Typography>
        <Typography variant="body1" paragraph>
          Copyright (c), {new Date().getFullYear()}, EkoForge OY
        </Typography>
        <Typography variant="body1" paragraph>
          Permission is hereby granted, free of charge, to any person obtaining a copy
          of this software and associated documentation files (the &quot;Software&quot;), to deal
          in the Software without restriction, including without limitation the rights
          to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
          copies of the Software, and to permit persons to whom the Software is
          furnished to do so, subject to the following conditions:
        </Typography>
        <Typography variant="body1" paragraph>
          The above copyright notice and this permission notice shall be included in all
          copies or substantial portions of the Software.
        </Typography>
        <Typography variant="body1" paragraph>
          THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
          IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
          FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
          AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
          LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
          OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
          SOFTWARE.
        </Typography>
      </Box>
      <Footer />
    </>
  );
}
