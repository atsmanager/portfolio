async function test() {
  try {
    const login = await fetch('http://localhost:5001/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'ashwanikumarchauhan014@gmail.com', password: 'Ashwani@2005' })
    });
    const { token } = await login.json();
    
    if(!token) { console.log('Login failed'); return; }

    const res = await fetch('http://localhost:5001/api/sections/reorder', { 
      method: 'PUT', 
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }, 
      body: JSON.stringify({ sections: [] }) 
    });
    console.log("Status:", res.status);
    console.log("Response:", await res.text());
  } catch(e) { console.error(e); }
}
test();
