# Axium AI chatbot
A locally hosted chatbot that answers questions about any YouTube video using Llama2 and Retrieval Augmented Generation.

## Features

- Extracts and learns from YouTube video content
- Lets users ask questions in natural language
- Uses Llama2 for fast, accurate responses

## Getting Started

### 1. Install Dependencies

First, install all required Python packages:

```bash
pip install -r requirements.txt
```

### 2. Install Llama-cpp-Python

To use Llama2 locally, you’ll need to install `llama-cpp-python`. This requires some additional setup:

#### Prerequisites

- Git
- Python
- CMake
- Visual Studio Community Edition (with these workloads):
  - Desktop development with C++
  - Python development
  - Linux embedded development with C++

#### Installation Steps

If you don’t have a GPU, set these environment variables before installing:

```bash
set FORCE_CMAKE=1
set CMAKE_ARGS=-DLLAMA_CUBLAS=OFF
```

Then install the package:

```bash
pip install llama-cpp-python -q
```

## Usage

To launch the chatbot, run:

```bash
streamlit run app.py
```

- Open the web interface in your browser
- Enter a YouTube video link and ask questions about its content
- Get answers based on both the video and general knowledge