<template>
  <div class="container mt-5">
    <div class="col-md-8 offset-md-2">
      <h1>Privacy</h1>
      <hr />
      <p>
        By registering with us as a research volunteer and using our mobile application, you accept
        the terms and conditions of this Privacy Policy and the processing of your personal data.
      </p>
      <p>
        The Personal Data Controller responsible for the processing of your personal data is:
      </p>

      <ul>
        <li>
          NAME: Dr. Stephen Coombes
        </li>
        <li>
          ADDRESS: 1864 Stadium Road, Gainesville FL 32611
        </li>
        <li>
          E-MAIL: scoombes@ufl.edu
        </li>
      </ul>

      <h2>
        1. Your personal data we collect
      </h2>
      <p>
        When we create an account for you, we give you a username (a unique code) and password to
        login to the application. You cannot create an account yourself.
      </p>
      <p>
        When you continue to use the mobile application, you <em>voluntarily</em> upload data linked
        to your account such as:
      </p>
      <ol>
        <li>
          A pain rating, a number representing a pain level, associated with specific regions on the
          body.
        </li>
        <li>
          Words describing the pain in specific regions on the body.
        </li>
        <li>
          Answers to health, fitness, and lifestyle-related questions customized by us for your
          account.
        </li>
      </ol>
      <p>
        We collect additional data from the following third party services we use:
      </p>
      <ol>
        <li>
          We use Firebase Cloud Messaging for sending push notifications to the device you’ve logged
          in on. For this, we have to store your Firebase Installation ID (a unique identifier for
          each of the mobile devices you’re logged in on).
        </li>
        <li>
          We use Sentry for capturing and reporting crashes on our mobile application. Crash reports
          include information such as your device ID, platform (iOS or Android), and operating
          system. Data collected by Sentry does not, by default, include any personally identifiable
          information (PII) and we do not augment our crash reports with any PII.
        </li>
      </ol>
      <p>
        For more information on how these services process and protect your data, please visit the
        following links:
      </p>
      <ul>
        <li>
          Firebase -
          <a href="https://www.google.com/url?q=https://firebase.google.com/support/privacy"
            >https://firebase.google.com/support/privacy</a
          >
        </li>
        <li>
          Sentry -
          <a href="https://www.google.com/url?q=https://sentry.io/privacy/"
            >https://sentry.io/privacy/</a
          >
        </li>
      </ul>
      <p>
        In an ongoing effort to improve your experience and our research, additional personal data
        may be collected from you. In such cases, we will notify you when the personal data
        collection takes place.
      </p>

      <h2>
        2. Our use of your personal data
      </h2>
      <p>
        Your privacy is important to us and we will only process your personal data in accordance
        with this Privacy Policy and relevant personal data regulation.
      </p>
      <h3>
        1. Research
      </h3>
      <p>
        We use your pain ratings and your answers to our questionnaire in our pain research studies.
        For more details, please visit <a href="https://www.lrnlab.org">https://www.lrnlab.org</a>.
      </p>
      <h3>
        2. For providing you the services
      </h3>
      <ul>
        <li>
          We use Oracle Cloud Infrastructure (OCI) for hosting our backend service. The back-end
          hosting is used to receive and store your personal data which is used for the research.
        </li>
        <li>
          Your device identifier (i.e. the Firebase installation ID) is used to send scheduled
          reminders (via push notifications) to your device.
        </li>
        <li>
          The errors and crashes reported from your device is used to fix bugs and improve your app
          experience.
        </li>
      </ul>
      <h2>
        3. Who we share your personal data with:
      </h2>
      <p>
        We share your Information with selected third parties, including vendors and service
        providers we rely on for the provision of the Services, for example: Cloud service providers
        who we rely on for data storage, including Oracle Cloud Infrastructure (OCI) and Google LLC
        who are based in the U.S.
      </p>
      <p>
        We use Oracle Cloud Infrastructure (OCI) for hosting our backend service. All the data we
        directly collect from you is stored on a OCI server. More information is available at
        <a href="https://www.oracle.com/legal/privacy/services-privacy-policy.html"
          >https://www.oracle.com/legal/privacy/services-privacy-policy.html</a
        >
        for OCI.
      </p>
      <p>
        Although we have in place security measures to maintain the privacy and integrity of your
        Information, the transmission of Information via the internet is not completely secure.
      </p>

      <h2>
        4. How long we store your information
      </h2>
      <p>
        Your Information is kept for as long as necessary to achieve the research purposes set out.
        You have the right to erase your information. You may do so by contacting us at
        <a href="mailto:scoombes@ufl.edu">scoombes@ufl.edu</a>. When deleting Information, we will
        take measures to make the Information irrecoverable or irreproducible, and electronic files
        which contain Information will be deleted permanently.
      </p>
      <p>
        You have the right to receive a copy of Information we have collected. You may do so by
        contacting us at <a href="mailto:scoombes@ufl.edu">scoombes@ufl.edu</a>.
      </p>

      <hr />

      <h1>
        Security Policy
      </h1>
      <p>
        We maintain a security system that prevents all unauthorized access.
      </p>
      <h2>
        1. Data Protection
      </h2>
      <ol>
        <li>
          <strong>In Transit:</strong> All user data including the pain rating, description and
          answers to customised questions are sent using industry best practices regarding traffic:
          Specifically, we use TLS 1.1-1.2 secure channels.
        </li>
        <li>
          <strong>At Rest:</strong> We use Oracle Cloud Infrastructure (OCI) to store all user data.
          We make extensive use of their built-in firewalls to protect your data against
          unauthorized remote access. We always store individuals passwords with unique salts to add
          an extra layer of protection to your account.
        </li>
      </ol>

      <h2>
        2. Report a Vulnerability
      </h2>
      <p>
        If you discover any security vulnerability, please email us:
        <a href="mailto:scoombes@ufl.edu">scoombes@ufl.edu</a>. We’ll do our best to fix it right
        away.
      </p>

      <h2>
        3. Data Privacy
      </h2>
      <p>
        We make it a priority to be transparent in how we collect, use, and handle your information
        when you use our website and software. Please see our privacy policy for more details.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Privacy"
};
</script>
