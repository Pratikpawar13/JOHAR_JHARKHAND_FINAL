#!/usr/bin/env node

const readline = require('readline');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (prompt) => {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
};

const generateSecretKey = () => {
  return crypto.randomBytes(64).toString('hex');
};

const setupAuth = async () => {
  console.log('🔐 Jharkhand Tourism - Authentication Setup');
  console.log('=' .repeat(50));
  console.log('This will help you configure the authentication system.\n');

  try {
    // Database configuration
    console.log('📊 Database Configuration:');
    const dbHost = await question('Enter MySQL host (default: localhost): ') || 'localhost';
    const dbUser = await question('Enter MySQL username (default: root): ') || 'root';
    const dbPassword = await question('Enter MySQL password: ');
    const dbName = await question('Enter database name (default: jharkhand_tourism): ') || 'jharkhand_tourism';

    // JWT configuration
    console.log('\n🔑 Security Configuration:');
    const jwtSecret = await question('Enter JWT secret (press Enter to generate): ') || generateSecretKey();
    const jwtRefreshSecret = await question('Enter JWT refresh secret (press Enter to generate): ') || generateSecretKey();

    // Server configuration
    console.log('\n🚀 Server Configuration:');
    const port = await question('Enter server port (default: 3000): ') || '3000';
    const frontendUrl = await question('Enter frontend URL (default: http://localhost:5173): ') || 'http://localhost:5173';

    // Generate .env content
    const envContent = `# Database Configuration
DB_HOST=${dbHost}
DB_USER=${dbUser}
DB_PASSWORD=${dbPassword}
DB_NAME=${dbName}

# JWT Configuration
JWT_SECRET=${jwtSecret}
JWT_REFRESH_SECRET=${jwtRefreshSecret}
JWT_EXPIRE=24h
JWT_REFRESH_EXPIRE=7d

# Server Configuration
PORT=${port}
NODE_ENV=development

# Email Configuration (for password reset)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
EMAIL_FROM=noreply@jharkhantourism.com

# Frontend URL
FRONTEND_URL=${frontendUrl}

# Existing GROQ API Key
GROQ_API_KEY=your_groq_api_key_here
`;

    // Write .env file
    const envPath = path.join(__dirname, '.env');
    fs.writeFileSync(envPath, envContent);
    console.log('\n✅ .env file created successfully!');

    // Test database connection
    console.log('\n🔧 Testing database connection...');
    const { testConnection } = require('./config/database');
    
    try {
      const connected = await testConnection();
      if (connected) {
        console.log('✅ Database connection successful!');
        
        // Setup database tables
        console.log('\n📋 Setting up database tables...');
        const { initializeTables } = require('./config/database');
        const tablesCreated = await initializeTables();
        
        if (tablesCreated) {
          console.log('✅ Database tables created successfully!');
          
          console.log('\n🎉 Authentication setup completed!');
          console.log('\nNext steps:');
          console.log('1. Start the server: npm run dev');
          console.log('2. Start the frontend: cd ../frontend && npm run dev');
          console.log('3. Visit: http://localhost:5173/auth to test authentication');
          console.log('4. Run tests: npm run test-auth');
          
        } else {
          console.log('❌ Failed to create database tables. Please check the logs.');
        }
      } else {
        console.log('❌ Database connection failed. Please check your credentials and try again.');
      }
    } catch (error) {
      console.log('❌ Database setup failed:', error.message);
      console.log('\nPlease ensure:');
      console.log('- MySQL server is running');
      console.log('- Database credentials are correct');
      console.log('- User has necessary permissions');
    }

  } catch (error) {
    console.error('Setup failed:', error.message);
  } finally {
    rl.close();
  }
};

if (require.main === module) {
  setupAuth();
}

module.exports = setupAuth;
