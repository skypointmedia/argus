import { Authenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";

Amplify.configure(outputs);

const ApplicationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <>
          


          <main>{children}</main>

        </>
      )}
    </Authenticator>
  );
};

export default ApplicationLayout;



