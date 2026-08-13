const { testConnection, initializeTables } = require('./config/database');

const setupDatabase = async () => {
    console.log('🔧 Setting up database...');
    
    try {
        // Test connection
        console.log('1. Testing database connection...');
        const connected = await testConnection();
        
        if (!connected) {
            console.error('❌ Failed to connect to database. Please check your database configuration in .env file');
            console.log('\nPlease ensure:');
            console.log('- MySQL server is running');
            console.log('- Database credentials are correct in .env file');
            console.log('- Database "jharkhand_tourism" exists (will be created if not)');
            process.exit(1);
        }

        // Initialize tables
        console.log('2. Initializing database tables...');
        const tablesCreated = await initializeTables();
        
        if (!tablesCreated) {
            console.error('❌ Failed to create database tables');
            process.exit(1);
        }

        console.log('\n✅ Database setup completed successfully!');
        console.log('\nCreated tables:');
        console.log('- users (main user accounts)');
        console.log('- tourist_profiles (tourist-specific data)');
        console.log('- local_profiles (local guide data)');
        console.log('- admin_profiles (admin-specific data)');
        console.log('- refresh_tokens (JWT refresh tokens)');
        console.log('- password_resets (password reset tokens)');
        
        console.log('\n🚀 You can now start the server with: npm start');
        
    } catch (error) {
        console.error('❌ Database setup failed:', error.message);
        process.exit(1);
    }
};

// Run setup if this file is executed directly
if (require.main === module) {
    setupDatabase();
}

module.exports = setupDatabase;
