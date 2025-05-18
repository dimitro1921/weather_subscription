import os

folders = [
    "app/config",
    "app/controllers",
    "app/models",
    "app/routes",
    "app/services",
    "app/utils",
    "migrations",
    "seeders"
]

files = [
    "app/config/config.js",
    "app/controllers/weatherController.js",
    "app/controllers/subscriptionController.js",
    "app/models/index.js",
    "app/models/subscription.js",
    "app/routes/index.js",
    "app/services/weatherService.js",
    "app/utils/tokenGenerator.js",
    "migrations/20230516120000-create-subscription.js",
    ".env",
    ".gitignore",
    "Dockerfile",
    "docker-compose.yml",
    "package.json",
    "README.md",
    "index.js"
]

def create_structure(base_dir="."):
    # Створюємо всі папки
    for folder in folders:
        os.makedirs(os.path.join(base_dir, folder), exist_ok=True)

    # Створюємо всі файли
    for file in files:
        file_path = os.path.join(base_dir, file)
        with open(file_path, "w", encoding="utf-8") as f:
            pass

    print("✅ Створено структуру проєкту у папці:", os.path.abspath(base_dir))

if __name__ == "__main__":
    create_structure()
