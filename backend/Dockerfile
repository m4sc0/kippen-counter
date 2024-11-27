FROM python:3.11-slim AS base

# Set working directory
WORKDIR /app

# Copy requirements and install dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy the Django project code
COPY . .

# Expose the application port
EXPOSE 8000

FROM base AS dev

# Run Django server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

