# Building

1. Edit env file
Rename `env.example` to `.env`, update your database credentials. Create a database with name `laravel`
Please use the following commands to setup project:

```bash
composer install
npm install
php artisan key:generate
php artisan migrate
php artisan db:seed
php artisan storage:link
npm run prod
```

1. Run the app using CLI:

```bash
php artisan serve
```

The app is now served on http://127.0.0.1:8000

