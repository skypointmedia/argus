
import { Authenticator } from '@aws-amplify/ui-react';
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";


Amplify.configure(outputs);

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <div>
          <header>
            <h1>Welcome {user.username}</h1>
            <button onClick={signOut}>Sign Out</button>
            {/* Other header content */}
          </header>
          <main>{children}</main>
          <footer>
            <p>Footer Content</p>
          </footer>
        </div>
      )}
    </Authenticator>
  );
};

export default Layout;
