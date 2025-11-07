# MySQL Database Setup with Aiven

This guide will help you set up and connect your Next.js application to Aiven MySQL database.

## Prerequisites

- Aiven account with MySQL service created
- Node.js and npm installed
- Access to your Aiven MySQL service credentials

## Installation

The required package `mysql2` has already been installed:

```bash
npm install mysql2
```

## Configuration

### 1. Get Aiven MySQL Credentials

1. Log in to your [Aiven Console](https://console.aiven.io/)
2. Navigate to your MySQL service
3. Copy the following connection details:
   - **Host**: Your service hostname (e.g., `mysql-xxxxx.aivencloud.com`)
   - **Port**: Usually `3306` for MySQL
   - **User**: Your database username (usually `avnadmin`)
   - **Password**: Your database password
   - **Database**: Your database name (usually `defaultdb`)

### 2. Configure Environment Variables

Update the `.env.local` file with your Aiven credentials:

```env
DB_HOST=your-aiven-mysql-host.aivencloud.com
DB_PORT=3306
DB_USER=avnadmin
DB_PASSWORD=your-password-here
DB_NAME=defaultdb
DB_SSL=true
```

**Important:** Never commit `.env.local` to version control!

### 3. Create Database Schema

Connect to your Aiven MySQL database and run the schema:

```bash
# Using MySQL client
mysql -h your-host.aivencloud.com -P 3306 -u avnadmin -p --ssl-mode=REQUIRED defaultdb < database/schema.sql
```

Or use the Aiven web console SQL editor to run the contents of `database/schema.sql`.

## Database Structure

The database utility is located at [src/lib/db.ts](src/lib/db.ts) and provides:

### Available Functions

```typescript
import { query, queryOne, testConnection, getConnection } from '@/lib/db';

// Execute a query
const results = await query('SELECT * FROM contacts');

// Execute a query and get single row
const contact = await queryOne('SELECT * FROM contacts WHERE id = ?', [1]);

// Test connection
const isConnected = await testConnection();

// Get a connection from pool
const connection = await getConnection();
```

## API Routes

### 1. Test Database Connection

**Endpoint:** `GET /api/test-db`

Test if the database connection is working:

```bash
curl http://localhost:3000/api/test-db
```

**Response:**
```json
{
  "success": true,
  "message": "Database connection successful",
  "databaseVersion": "8.0.x",
  "timestamp": "2025-11-07T..."
}
```

### 2. Contacts API

**Get all contacts:**
```bash
GET /api/contacts
```

**Create a contact:**
```bash
POST /api/contacts
Content-Type: application/json

{
  "name": "Ahmed Al-Saud",
  "email": "ahmed@example.sa",
  "phone": "+966501234567",
  "subject": "Cybersecurity Inquiry",
  "message": "I would like to know more about your services."
}
```

## Usage Examples

### In a Server Component

```typescript
// src/app/admin/contacts/page.tsx
import { query } from '@/lib/db';

export default async function ContactsPage() {
  const contacts = await query('SELECT * FROM contacts ORDER BY created_at DESC');

  return (
    <div>
      <h1>Contacts</h1>
      {contacts.map((contact) => (
        <div key={contact.id}>
          <h3>{contact.name}</h3>
          <p>{contact.email}</p>
        </div>
      ))}
    </div>
  );
}
```

### In an API Route

```typescript
// src/app/api/user/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { queryOne } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await queryOne(
    'SELECT * FROM users WHERE id = ?',
    [params.id]
  );

  if (!user) {
    return NextResponse.json(
      { error: 'User not found' },
      { status: 404 }
    );
  }

  return NextResponse.json({ data: user });
}
```

### With TypeScript Types

```typescript
import { query } from '@/lib/db';
import { RowDataPacket } from 'mysql2';

interface Contact extends RowDataPacket {
  id: number;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  created_at: Date;
}

const contacts = await query<Contact[]>(
  'SELECT * FROM contacts WHERE email = ?',
  ['example@email.com']
);
```

## Security Best Practices

1. **Always use parameterized queries** to prevent SQL injection:
   ```typescript
   // ✅ Good - Parameterized
   await query('SELECT * FROM users WHERE email = ?', [email]);

   // ❌ Bad - SQL Injection vulnerable
   await query(`SELECT * FROM users WHERE email = '${email}'`);
   ```

2. **Use environment variables** for sensitive data
3. **Enable SSL/TLS** for Aiven connections (already configured)
4. **Limit database user permissions** in production
5. **Never expose database credentials** in client-side code

## Connection Pool Configuration

The database connection uses a pool with these settings:

- **connectionLimit:** 10 concurrent connections
- **waitForConnections:** Queue requests when pool is full
- **queueLimit:** Unlimited queue size
- **keepAlive:** Enabled to maintain connections

You can modify these in [src/lib/db.ts](src/lib/db.ts).

## Troubleshooting

### Connection Refused Error

- Verify your Aiven service is running
- Check if your IP is whitelisted in Aiven console
- Ensure SSL is enabled (`DB_SSL=true`)

### SSL/TLS Errors

Aiven requires SSL. Make sure:
```env
DB_SSL=true
```

### Authentication Errors

- Double-check username and password
- Ensure you're using the correct database name
- Verify credentials in Aiven console

### Timeout Errors

- Check your internet connection
- Verify Aiven service status
- Increase connection pool timeout if needed

## Testing

Start the development server and test the connection:

```bash
npm run dev
```

Then visit: http://localhost:3000/api/test-db

You should see a success message with the database version.

## Production Deployment

For production deployment:

1. Set environment variables in your hosting platform (Vercel, AWS, etc.)
2. Use Aiven's production-ready MySQL service
3. Enable connection pooling (already configured)
4. Monitor database performance in Aiven console
5. Set up automated backups in Aiven

## Additional Resources

- [Aiven MySQL Documentation](https://aiven.io/docs/products/mysql)
- [MySQL2 Package Documentation](https://github.com/sidorares/node-mysql2)
- [Next.js Database Integration](https://nextjs.org/docs/app/building-your-application/data-fetching)

## Support

For issues related to:
- **Aiven:** Contact [Aiven Support](https://aiven.io/support)
- **Application:** Create an issue in this repository
