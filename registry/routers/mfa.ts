import { ManagementClient } from "auth0";
import { NextResponse } from "next/server";

import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";

/**
 * Make sure to install the withRateLimit from:
 *   - https://components.lab.auth0.com/docs/rate-limit#helpers
 */
import { withRateLimit } from "./helpers/rate-limit";

const client = new ManagementClient({
  domain: new URL(process.env.AUTH0_ISSUER_BASE_URL!).host,
  clientId: process.env.AUTH0_CLIENT_ID_MGMT!,
  clientSecret: process.env.AUTH0_CLIENT_SECRET_MGMT!,
});

/**
 * @example export const GET = handleMFAFactorsList();
 */
export function handleMFAFactorsList() {
  return withRateLimit(
    withApiAuthRequired(async (): Promise<NextResponse> => {
      try {
        const session = await getSession();
        const user_id = session?.user.sub;
        const availableFactors = [
          "push-notification",
          "sms",
          "voice",
          "otp",
          "webauthn-roaming",
          "webauthn-platform",
        ];
        const { data: factors } = await client.guardian.getFactors();
        const response = await client.users.getAuthenticationMethods({
          id: user_id,
        });
        const { data: enrollments } = response;

        return NextResponse.json(
          factors
            .filter((factor: any) => {
              let factorName: string = factor.name;

              return availableFactors.includes(factorName) && factor.enabled;
            })
            .map((factor: any) => {
              const enrollmentInfo = enrollments.find((enrollment: any) => {
                let factorName: string = factor.name;

                if (factor.name === "sms" || factor.name === "voice") {
                  factorName = "phone";
                }

                return enrollment.type.includes(factorName);
              });

              return {
                ...factor,
                enrollmentId: enrollmentInfo?.id,
              };
            }),
          {
            status: response.status,
          }
        );
      } catch (error) {
        console.error(error);
        return NextResponse.json(
          { error: "Error fetching MFA Enrollments" },
          { status: 500 }
        );
      }
    })
  );
}

/**
 * @example export const POST = handleMFAFactorEnrollment();
 */
export function handleMFAFactorEnrollment() {
  return withRateLimit(
    withApiAuthRequired(async (request: Request): Promise<NextResponse> => {
      try {
        const session = await getSession();
        const user_id = session?.user.sub;
        const { factor }: { factor: string } = await request.json();
        let factorName: string = factor;

        if (factor === "sms" || factor === "voice") {
          factorName = "phone";
        }

        const response = await client.guardian.createEnrollmentTicket({
          user_id,
          //@ts-ignore
          factor: factorName,
          allow_multiple_enrollments: true,
        });
        const { data } = response;

        return NextResponse.json(data, {
          status: response.status,
        });
      } catch (error) {
        console.error(error);
        return NextResponse.json(
          { error: "Error creating MFA Enrollment" },
          { status: 500 }
        );
      }
    })
  );
}

/**
 * @example export const DELETE = handleMFADeleteEnrollment();
 */
export function handleMFADeleteEnrollment() {
  return withRateLimit(
    withApiAuthRequired(
      async (request: Request, { params }: any): Promise<NextResponse> => {
        try {
          const session = await getSession();
          const user_id = session?.user.sub;
          const { enrollmentId }: { enrollmentId: string } = params;

          await client.users.deleteAuthenticationMethod({
            id: user_id,
            authentication_method_id: enrollmentId,
          });

          return NextResponse.json(
            { id: enrollmentId },
            {
              status: 200,
            }
          );
        } catch (error) {
          console.error(error);
          return NextResponse.json(
            { error: "Error deleting MFA Enrollment" },
            { status: 500 }
          );
        }
      }
    )
  );
}
