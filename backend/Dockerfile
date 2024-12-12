# Install Debian OS + python 3 so requirements.txt could be install without errors (system bug / missing dependencies):
FROM python:3

# Create /app folder (and make this folder the "Current Directory"): 
WORKDIR /app

# Create virtual environment inside the image suitable for Linux: 
RUN python -m venv .venv

# Copy only requirements.txt so we could install requirements as soon as posible: 
COPY requirements.txt /app

# Install requirements.txt inside the virtual environment: 
RUN /app/.venv/bin/pip install -r requirements.txt

# Copy entire project into /app:
COPY . /app

# Run python within the virtual environment when container starts:
ENTRYPOINT /app/.venv/bin/python src/manage.py runserver 0.0.0.0:8000


