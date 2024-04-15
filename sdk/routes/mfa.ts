import { Factor, ManagementClient } from "auth0";
import { NextResponse } from "next/server";

import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";

const client = new ManagementClient({
  domain: new URL(process.env.AUTH0_ISSUER_BASE_URL!).host,
  clientId: process.env.AUTH0_CLIENT_ID_MGMT!,
  clientSecret: process.env.AUTH0_CLIENT_SECRET_MGMT!,
});

export function handleMFAFactorsList() {
  return withApiAuthRequired(
    async (request: Request): Promise<NextResponse> => {
      const session = await getSession();
      const user_id = session?.user.sub;
      const availableFactors = [
        "push-notification",
        "phone",
        "otp",
        "webauthn-roaming",
        "webauthn-platform",
      ];
      const { data } = await client.guardian.getFactors();
      const { data: enrollments } = await client.users.getEnrollments({
        id: user_id,
      });

      return NextResponse.json(
        data
          .filter((factor: any) => {
            let factorName: string = factor.name;

            if (factor.name === "sms" || factor.name === "voice") {
              factorName = "phone";
            }

            return availableFactors.includes(factorName) && factor.enabled;
          })
          .map((factor: any) => {
            const enrollmentInfo = enrollments.find((enrollment: any) => {
              return enrollment.type === factor.name;
            });

            return {
              ...factor,
              enrollmentId: enrollmentInfo?.id,
            };
          })
      );
    }
  );
}

export function handleMFAFactorEnrollment() {
  return withApiAuthRequired(
    async (request: Request): Promise<NextResponse> => {
      const session = await getSession();
      const user_id = session?.user.sub;
      const { factor }: { factor: string } = await request.json();
      let factorName: string = factor;

      if (factor === "sms" || factor === "voice") {
        factorName = "phone";
      }

      const { data } = await client.guardian.createEnrollmentTicket({
        user_id,
        //@ts-ignore
        factor: factorName,
        allow_multiple_enrollments: true,
      });

      return NextResponse.json(data);
    }
  );
}

export function handleMFADeleteEnrollment() {
  return withApiAuthRequired(
    async (request: Request, { params }: any): Promise<NextResponse> => {
      const { enrollmentId }: { enrollmentId: string } = params;

      await client.guardian.deleteGuardianEnrollment({
        id: enrollmentId,
      });

      return NextResponse.json({ enrollmentId });
    }
  );
}
